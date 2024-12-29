import express from "express";
import { saveUser, saveFriends, searchUser, deleteUser, updateUser, listSortedUsers } from "../controllers/userController";

const router = express.Router();

router.post("/users", saveUser);
router.post("/users/:username/friends", saveFriends);
router.get("/users/search", searchUser);
router.put("/users/:username", updateUser);
router.delete("/users/:username", deleteUser);
router.get("/users/sorted", listSortedUsers);

export default router;
