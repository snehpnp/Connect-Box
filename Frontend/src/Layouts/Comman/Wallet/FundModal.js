import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function FundModal({ show, handleClose, handleSubmit, actionType, cardData }) {
  const [amount, setAmount] = useState("");

  const onSubmit = () => {
    handleSubmit(amount, actionType);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {actionType === "add" ? "Add Funds" : "Withdraw Funds"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => {
              if(actionType != "add"){
                if (e.target.value < 0) {
                  setAmount(0);
                } else if (e.target.value > cardData.RemainingBalance) {
                  setAmount(cardData.RemainingBalance);
                } else {
                  setAmount(e.target.value);
                }
              }else{
                setAmount(e.target.value);

              }
              }}
              placeholder="Enter amount"
           
            />
            {actionType != "add" ? ( 
                <Form.Text className="text-muted" style={{fontWeight:"bold"}}>
                Max withdrawable amount is {cardData.RemainingBalance}
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={(e)=>{handleClose();setAmount("")}}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {actionType === "add" ? "Add Funds" : "Withdraw Funds"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FundModal;
