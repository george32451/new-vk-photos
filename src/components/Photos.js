import React, { Component } from 'react';
import Photocard from "./Photocard";

class Photos extends Component {
    state = {
        photos: [],
    };

    handleClick = () => {
        //eslint-disable-next-line no-undef
        VK.Api.call('photos.getAll', { count: 200, no_service_albums: 0, photos_sizes: 0, v: "5.87"}, (r) => {
            if(r.response) {
                this.setState({
                    photos: r.response.items
                })
            }
        });

    }

    render() {
        const photosElements = this.state.photos.map((photo) =>
            <div key={photo.id} className="col-sm-3">
                <Photocard
                    photo={ photo }
                    photoId={ photo.id }
                    photoText = { photo.text }
                />
            </div>
        );
        return(
            <div>
                <button className="btn btn-primary"
                        onClick={this.handleClick}>
                    Загрузить фото
                </button>
                <div className="container" >
                    <div className="row">
                        { this.state.photos.length > 0 && photosElements }
                    </div>
                </div>
            </div>
        )
    }
}

export default Photos