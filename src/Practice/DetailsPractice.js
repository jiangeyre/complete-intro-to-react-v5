import React from 'react';
import pet from "@frontendmasters/pet";
import CarouselPrac from "./CarouselPractice";
import ErrorBoundaryPrac from './ErrorBoundaryPractice';
import ThemeContextPrac from './ThemeContextPractice';
import { navigate } from "@reach/router";
import Modal from "./Modal";


class DetailsPrac extends React.Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         loading: true
    //     };
    // }
    state = { loading: true, showModal: false };
//
    componentDidMount () {
        //this.props from parents
        pet
        .animal(this.props.id)
        .then(({ animal }) => {
          this.setState({
            name: animal.name,
            animal: animal.type,
            location: `${animal.contact.address.city}, ${
              animal.contact.address.state
            }`,
            description: animal.description,
            media: animal.photos,
            breed: animal.breeds.primary,
            url: animal.url,
            loading: false
          });
        })
        .catch(err => this.setState({ error: err }));
    }
    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => navigate(this.state.url);

    render () {
        //hooks do not work with classes
        if (this.state.loading) {
            return <h1>loading...</h1>
        }

    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal
    } = this.state;


        return (
            <div className="details">
            <CarouselPrac media={media} />
            <div>
              <h1>{name}</h1>
              <h2>{`${animal} — ${breed} — ${location}`}</h2>
              <ThemeContextPrac.Consumer>
                {([theme]) => (
                  <button
                    style={{ backgroundColor: theme }}
                    onClick={this.toggleModal}
                  >
                    Adopt {name}
                  </button>
                )}
              </ThemeContextPrac.Consumer>
              <p>{description}</p>
              {showModal ? (
                <Modal>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </Modal>
              ) : null}
            </div>
          </div>
        );
    }
}


export default function DetailsPracWithErrorBoundary(props) {
    return (
        <ErrorBoundaryPrac>
            {/* spread operators: spread the props across details */}
            <DetailsPrac {...props} />
        </ErrorBoundaryPrac>
    )
};
