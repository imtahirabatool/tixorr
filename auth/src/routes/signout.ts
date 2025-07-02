import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
    req.session = null; // Clear the session

    res.status(200).json({
        message: "Successfully signed out"
    });
});

export { router as signoutRouter };