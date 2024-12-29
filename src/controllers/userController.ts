import axios from "axios";
import { Request, Response } from "express";
import User from "../models/userModel";
import { validateGithubUsername } from "../utils/validation";

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;

  if (!validateGithubUsername(username)) {
    res.status(400).json({ message: "Invalid GitHub username" });
    return;
  }

  try {
    const existingUser = await User.findOne({ username, isDeleted: false });
    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const { data } = await axios.get(`https://api.github.com/users/${username}`);

    if (!data.login) {
      res.status(400).json({ message: "GitHub username is missing in the response" });
      return;
    }

    const userPayload = {
      username: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      blog: data.blog,
      location: data.location,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
    };

    const user = new User(userPayload);
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ message: "Error fetching user data from GitHub", error });
    } else {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};

export const saveFriends = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  const user = await User.findOne({ username }).populate("friends");
  if (!user) {
    res.status(404).json({ message: "User not found in DB" });
    return;
  }

  try {
    const [followers, following] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}/followers`),
      axios.get(`https://api.github.com/users/${username}/following`),
    ]);

    const followerSet = new Set(followers.data.map((u: any) => u.login));
    const mutualFriends = following.data
      .filter((u: any) => followerSet.has(u.login))
      .map((friend: any) => friend.login);

    const mutualFriendDocs = await User.find({ username: { $in: mutualFriends } });

    user.friends = mutualFriendDocs.map((friend) => friend._id);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const searchUser = async (req: Request, res: Response): Promise<void> => {
  const { username, location } = req.query;

  try {
    const criteria: any = {};
    if (username) criteria.username = username;
    if (location) criteria.location = location;

    const users = await User.find(criteria);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate({ username }, { isDeleted: true });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate({ username }, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const listSortedUsers = async (req: Request, res: Response): Promise<void> => {
  const { sortBy } = req.query;
  const allowedSortFields = ["public_repos", "public_gists", "followers", "following", "created_at"];

  if (!allowedSortFields.includes(String(sortBy))) {
    res.status(400).json({ message: "Invalid sort field" });
    return;
  }

  try {
    const users = await User.find().sort({ [String(sortBy)]: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Sort failed" });
  }
};
