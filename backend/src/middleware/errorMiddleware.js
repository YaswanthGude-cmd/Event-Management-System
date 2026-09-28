const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);

    // INVALID MONGODB OBJECT ID
    if(err.name === "CastError"){
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    // MONGOOSE VALIDATION ERROR
    if(err.name === "ValidationError"){
        return res.status(400).json({
            message: "Validation Error",
            errors: object.values(err.errors).map(e => e.message)
        });
    }

    // DUPLICATE VALUE ERROR
    if(err.code === 11000){
        return res.status(400).json({
            message: "Duplicate value already exists"
        });
    }

    res.status(500).json({
        message: "Server error"
    });
};

module.exports = errorHandler;