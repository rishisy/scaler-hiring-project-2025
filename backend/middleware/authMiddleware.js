import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';


const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // yaha pe user object ko attach krdere hai so that it can be used in subsequent fucntion in chain .
            // if this protect method is not used no one will be able to use this user object
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const authorizeProject = (req, res, next) => {
    const user = req.user; // Assuming you have user information in the request
    const project = req.project; // Assuming project is available from previous middleware

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the project owner or a team member
    if (user.role === 'owner' || project.teamMembers.includes(user._id)) {
        next(); // Allow access
    } else {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
};

export { protect  , authorizeProject };
