import codemodel from "../models/Deploy.model.js";
import usermodel from "../models/user.model.js";

export async function handleSendcode(req, res) {
  const { projectName, language, code } = req.body;

  if (!projectName || !language || !code) {
    return res.status(400).json({
      message: "Fill all the fields",
      success: false,
    });
  }

  const codes = await codemodel.create({
    projectName,
    language,
    code,
    createdBy: req.user.userid,
  });

  res.status(201).json({
    message: "Deployed Successfully",
    success: true,
  });
}

export async function getallCode(req, res) {
  try {
    const code = await codemodel.find({}).populate("createdBy", "username email");

    res.status(200).json({
      message: "Here are all the codes",
      code,
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}

export async function handleDeleteCode(req, res) {
  const code = await codemodel.findById(req.params.id).populate("createdBy");

  if (!code) {
    return res.status(400).json({
      message: "Code not found",
      success: false,
    });
  }

  if (code.createdBy._id.toString() === req.user.userid) {
    await code.deleteOne();
    return res.json({
      message: "Deleted Successfully",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Unauthorized to delete",
      success: false,
    });
  }
}


export async function handleCommentcodes(req, res) {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
      message: "Empty comment is not allowed",
      success: false,
    });
  }

  const codes = await codemodel.findById(req.params.id);
  if (!codes) {
    return res.status(404).json({
      message: "Code not found",
      success: false,
    });
  }

  // Ensure user ID is an ObjectId
  const newComment = {
    user:req.user.userid,  
    text,
  };

  codes.comments.push(newComment);
  await codes.save(); 

  const updatedCode = await codemodel
  .findById(req.params.id)
  .populate({ path: "comments", populate: { path: "user",model:"user" } })
  
  console.log(updatedCode)
  res.json({ message: "Comment added!", comments: updatedCode });
}



export async function getSingleCode(req, res) {
  const code = await codemodel.findById(req.params.id).populate("createdBy", "username email");

  if (!code) {
    return res.status(404).json({
      message: "Code not found",
      success: false,
    });
  }

  const userCodes = await codemodel.findById(req.params.id).populate("comments.user")

  console.log(userCodes.comments[0])
  
  res.json({
    message: "Here is the code",
    code,
    userCodes

  });
}
