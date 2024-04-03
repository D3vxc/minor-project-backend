const Membership = require("./membership.model.js");

const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
    console.log("memberships", memberships);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createMembership = async (req, res) => {
  const { PlanName, PlanPrice, PlanType, GST, isActive } = req.body;
  try {
    const newMembership = new Membership({
      PlanName,
      PlanPrice,
      PlanType,
      GST,
      isActive,
    });
    const savedMembership = await newMembership.save();
    res.status(201).json(savedMembership);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMembership = async (req, res) => {
  const membershipId = req.params.id;

  try {
    const deletedMembership = await Membership.findByIdAndRemove(membershipId);

    if (!deletedMembership) {
      return res.status(500).json({ message: "Membership not found" });
    }

    res.json({ message: "Membership deleted successfully", deletedMembership });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateMembership = async (req, res) => {
  // console.log("id here", req.query.membershipId);
  const membershipId = req.query.membershipId;
  const { PlanName, PlanPrice, PlanType, GST, isActive } = req.body;
  try {
    const updatedMembership = await Membership.findByIdAndUpdate(
      membershipId,
      {
        PlanName,
        PlanPrice,
        PlanType,
        GST,
        isActive,
      },
      { new: true }
    );

    if (!updatedMembership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.json({ message: "Membership updated successfully", updatedMembership });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllMemberships,
  createMembership,
  deleteMembership,
  updateMembership,
};
