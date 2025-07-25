import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback"; // Feedback icon

function Feedback({ feedbackList }) {
  return (
    <div className="feedback-container">
      {/* Light grey box around the entire feedback section */}
      <Card className="feedback-list-card">
        <CardContent>
          {/* Feedback section header */}
          <div className="feedback-header">
            <FeedbackIcon style={{ fontSize: 40, color: "#4caf50" }} />
            <Typography variant="h5" className="feedback-title">User Feedback</Typography>
          </div>

          {/* Loop through the feedback list and render each feedback */}
          <div className="feedback-cards">
            {feedbackList.map((feedback) => (
              <Card key={feedback.id} className="feedback-card">
                <CardContent>
                  {/* Display Feedback ID and comment */}
                  <Typography variant="h6" className="feedback-id">
                    ID: {feedback.id}
                  </Typography>
                  <Typography variant="body1" className="feedback-comment">
                    {feedback.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Feedback;
