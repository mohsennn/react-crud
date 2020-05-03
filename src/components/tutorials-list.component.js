import React, { Component, Fragment } from "react";
import TutorialDataService from "../services/tutorial.service";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";

export default class TutorialsList extends Component {
  state = {
    tutorials: [],
    newTutorialData: {
      title: "",
      description: "",
    },
    editTutorialData: {
      id: "",
      title: "",
      description: "",
    },
    newTutorialModal: false,
    editTutorialModal: false,
  };

  componentWillMount() {
   this._refreshTutorials();
  }

  toggleNewTutorialModal() {
    this.setState({
      newTutorialModal: !this.state.newTutorialModal,
    });
  }

  toggleEditTutorialModal() {
    this.setState({
      editTutorialModal: !this.state.editTutorialModal,
    });
  }

  addTutorial() {
    TutorialDataService.create(this.state.newTuTorialData)
      .then((response) => {
        let { tutorials } = this.state;

        tutorials.push(response.data);

        this.setState({
          tutorials,
          newTutorialModal: false,
          newTuTorialData: {
            title: "",
            description: "",
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  editTutorial(id, title, description) {
    this.setState({
      editTutorialData: { id, title, description },
      editTutorialModal: ! this.state.editTutorialModal
    });
  }

  updateTutorial() {
    let { title,description } = this.state.editTutorialData;
    TutorialDataService.update(this.state.editTutorialData.id, {
       title, description 
      }).then((response) => {
        this._refreshTutorials();
        this.setState({
          editTutorialModal: false,
          editTutorialData : {
            title: "",
            description: "",
          },
        });
      })

      }
      deleteTutorial(id){
        console.log('*** id is *** ',id);
        TutorialDataService.delete(id).then((response) => {
         this._refreshTutorials();
         })
      }
 
 _refreshTutorials(){
  TutorialDataService.getAll().then((response) => {
    this.setState({
      tutorials: response.data,
    });
  });
 }



  render() {
    let tutorials = this.state.tutorials.map((tutorial) => {
      return (
        <tr key={tutorial.id}>
          <td> {tutorial.id} </td>
          <td> {tutorial.title} </td>
          <td> {tutorial.description}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editTutorial.bind(
                this,
                tutorial.id,
                tutorial.title,
                tutorial.description
              )}
            >
              Edit
            </Button>
            <Button color="danger" onClick= {this.deleteTutorial.bind(this,tutorial.id)} size="sm">
              
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <h1> Tutorial App </h1>
        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewTutorialModal.bind(this)}
        >
          Add Tutorial
        </Button>
        <Modal
          isOpen={this.state.newTutorialModal}
          toggle={this.toggleNewTutorialModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewTutorialModal.bind(this)}>
            Add new Tutorial
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title"> Title </Label>
              <Input
                id="title"
                placeholder="Title"
                value={this.state.newTutorialData.title}
                onChange={(e) => {
                  let { newTutorialData } = this.state;
                  newTutorialData.title = e.target.value;
                  this.setState({ newTutorialData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description"> Description </Label>
              <Input
                id="title"
                placeholder="description"
                value={this.state.newTutorialData.description}
                onChange={(e) => {
                  let { newTutorialData } = this.state;
                  newTutorialData.description = e.target.value;
                  this.setState({ newTutorialData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addTutorial.bind(this)}>
              Add Tutorial
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewTutorialModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editTutorialModal}
          toggle={this.toggleEditTutorialModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditTutorialModal.bind(this)}>
            Edit Tutorial
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title"> Title </Label>
              <Input
                id="title"
                placeholder="Title"
                value={this.state.editTutorialData.title}
                onChange={(e) => {
                  let { editTutorialData } = this.state;
                  editTutorialData.title = e.target.value;
                  this.setState({ editTutorialData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description"> Description </Label>
              <Input
                id="title"
                placeholder="description"
                value={this.state.editTutorialData.description}
                onChange={(e) => {
                  let { editTutorialData } = this.state;
                  editTutorialData.description = e.target.value;
                  this.setState({ editTutorialData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateTutorial.bind(this)}>
              Update Tutorial
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditTutorialModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <table>
          <thead>
            <tr>
              <th> # </th> <th> Title</th>
              <th> Description</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>{tutorials}</tbody>
        </table>
      </div>
    );
  }
}
