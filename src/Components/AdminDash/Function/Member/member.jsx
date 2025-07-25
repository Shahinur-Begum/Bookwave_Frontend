import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { Notifications, Settings, Message, Search } from "@mui/icons-material";
import "./member.css"; // Ensure this file exists for styling
import AdminSidebar from "../../adminheader/AdminSidebar";
import { GiBookCover } from "react-icons/gi";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import dummyImg from "../../../../Assets/dummy.jpeg";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    dept: "",
    password: "",
    address: "",
    email: "",
    batch: "",
    interest: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/students")
      .then((response) => {
        setMembers(response.data);
        setFilteredMembers(response.data);
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  useEffect(() => {
    const filtered = members.filter((member) => {
      return (
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id?.toString().includes(searchTerm) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  const handleAddMember = () => {
    if (Object.values(newMember).some((value) => value === "")) {
      alert("All fields must be filled out!");
      return;
    }
    axios
      .post("http://localhost:8080/api/admin/students", newMember)
      .then((response) => {
        const updatedMembers = [...members, response.data];
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);

        setNewMember({
          id: "",
          name: "",
          dept: "",
          password: "",
          address: "",
          email: "",
          batch: "",
          interest: "",
        });
      })
      .catch((error) => console.error("Error adding member:", error));
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:8080/api/admin/students/${memberToEdit.id}`, memberToEdit)
      .then((response) => {
        const updatedMembers = members.map((member) =>
          member.id === memberToEdit.id ? response.data : member
        );
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        setIsEditDialogOpen(false);
        setMemberToEdit(null);
      })
      .catch((error) => console.error("Error updating member:", error));
  };

  const handleDeleteMember = () => {
    axios
      .delete(`http://localhost:8080/api/admin/students/${memberToDelete}`)
      .then(() => {
        const updatedMembers = members.filter((member) => member.id !== memberToDelete);
        setMembers(updatedMembers);
        setFilteredMembers(updatedMembers);
        setIsDeleteDialogOpen(false);
        setMemberToDelete(null);
      })
      .catch((error) => console.error("Error deleting member:", error));
  };

  const handleEditDialogOpen = (member) => {
    setMemberToEdit({ ...member });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="admins-dashboard">
      <div className="admins-main-content">
        <AdminSidebar />
        <nav className="mem-navbar">
          <div className="memnavbar-left">
            <IconButton className="memnavbar-icon">
              <GiBookCover size={40} color="white" />
            </IconButton>
          </div>
          <div className="memnavbar-center">
            <TextField
              variant="outlined"
              placeholder="Search Members..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              className="memnavbar-search"
              fullWidth
            />
          </div>
          <div className="memnavbar-right">
            <Avatar alt="Profile" src={dummyImg} className="profile-avatar" />
          </div>
        </nav>
        <div className="mem-welcome">
          <div className="mem-welcome-content">
            <h2>Member Management</h2>
            <p>Here you can manage all your members and their information.</p>
          </div>
          <div className="mem-welcome-image"></div>
        </div>
        <div className="member-container">
          <div className="member-form">
            {[{ label: "Id", key: "id" }, { label: "Name", key: "name" }, { label: "Dept", key: "dept" }, { label: "Password", key: "password" }, { label: "Address", key: "address" }, { label: "Email", key: "email" }, { label: "Batch", key: "batch" }, { label: "Interest", key: "interest" }].map(({ label, key }, index) => (
              <TextField
                key={index}
                label={label}
                variant="outlined"
                value={newMember[key]}
                onChange={(e) => setNewMember({ ...newMember, [key]: e.target.value })}
                className="member-input"
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMember}
              className="member-add-button"
            >
              Add Member
            </Button>
          </div>

          <TableContainer component={Paper} className="member-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  {["ID", "Name", "Department", "Address", "Email", "Batch", "Interest", "Action"].map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.id || "N/A"}</TableCell>
                    <TableCell>{member.name || "N/A"}</TableCell>
                    <TableCell>{member.dept || "N/A"}</TableCell>
                    <TableCell>{member.address || "N/A"}</TableCell>
                    <TableCell>{member.email || "N/A"}</TableCell>
                    <TableCell>{member.batch || "N/A"}</TableCell>
                    <TableCell>{member.interest || "N/A"}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditDialogOpen(member)} className="memedit-button">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            setMemberToDelete(member.id);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="memdelete-button"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this member?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteDialogOpen(false)}
            color="primary"
            variant="outlined"
            style={{ minWidth: 80, color: "#228B22", borderColor: "#228B22" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteMember}
            color="error"
            variant="contained"
            style={{ minWidth: 80, color: "white", backgroundColor: "#B22222" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          {[{ label: "Id", key: "id" }, { label: "Name", key: "name" }, { label: "Dept", key: "dept" }, { label: "Address", key: "address" }, { label: "Email", key: "email" }, { label: "Batch", key: "batch" }, { label: "Interest", key: "interest" }].map(({ label, key }, index) => (
            <TextField
              key={index}
              label={label}
              variant="outlined"
              value={memberToEdit?.[key] || ""}
              onChange={(e) => setMemberToEdit((prev) => ({ ...prev, [key]: e.target.value }))}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsEditDialogOpen(false)}
            className="cancel-edit-button"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} className="save-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Member;
