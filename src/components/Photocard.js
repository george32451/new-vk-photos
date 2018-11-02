import React from 'react'

class Photocard extends React.Component {
    state = {
        comments: [],
        isOpen: false,
        sendQuery: 0,
        descriptionChange: '',
        commentChange: '',
    };

    render(){
        const commentsElements = this.state.comments.map((comment) =>
            <li key={comment.id} style={{listStyleType: "none", margin: "0px"}}>
                <p style={{margin: "0px"}}>Author id{comment.from_id}</p>
                {comment.text}
            </li>
        );
        const { photo, photoText } = this.props;
        const { descriptionChange, isOpen, comments, commentChange } = this.state;
        return(
            <React.Fragment>
                <div className="card" >
                    <img
                        className="card-img-top"
                        src={photo.sizes[photo.sizes.length-1].url}
                        alt={photo.text}
                        onClick={this.handleClick}>
                    </img>
                                {
                                    isOpen ?
                                        <div>
                                            <div className="card-header">
                                                <textarea
                                                    id="descriptionChange"
                                                    className="card-text"
                                                    value={descriptionChange}
                                                    onChange={this.handleChange}
                                                    placeholder={photoText.trim() ? photoText : "Описания нет"}>
                                                </textarea>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={this.handleSendDescription}
                                                    >
                                                    Отправить
                                                </button>
                                            </div>
                                            <div className="card-body">
                                                        {comments.length > 0 ?
                                                            <React.Fragment>
                                                                <p className="card-text">Комментарии</p>
                                                                <ul>{commentsElements}</ul>
                                                                <textarea
                                                                    id="commentChange"
                                                                    onChange={this.handleChange}
                                                                    placeholder="Введите комментарий"
                                                                    value={commentChange}>
                                                                </textarea>
                                                            </React.Fragment> :
                                                            <React.Fragment>
                                                                <p className="card-text">Комментарии</p>
                                                                <textarea
                                                                    id="commentChange"
                                                                    onChange={this.handleChange}
                                                                    placeholder="Введите комментарий"
                                                                    value={commentChange}>
                                                                </textarea>
                                                            </React.Fragment>}
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={this.handleSendComment}>
                                                    Отправить
                                                </button>
                                            </div>
                                        </div> :
                                    null
                                }
                </div>
            </React.Fragment>
        )
    }

    handleClick = () => {
        const { photoId } = this.props;
        if(!this.state.isOpen && this.state.sendQuery === 0) {
            //eslint-disable-next-line no-undef
            VK.Api.call('photos.getComments', {photo_id: photoId, v: "5.87"}, (r) => {
                if (r.response) {
                    this.setState({
                        comments: r.response.items,
                        isOpen: !this.state.isOpen,
                        sendQuery: 1,
                    })
                }
            });
        } else {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }
    };

    handleChange = (e) => {
        const { id } = e.currentTarget;
        this.setState({
            [id]: e.currentTarget.value
        })
    };

    handleSendDescription = () => {
        const { photoId } = this.props;
        //eslint-disable-next-line no-undef
        VK.Api.call('photos.edit', {photo_id: photoId, caption: this.state.descriptionChange, v: "5.87"}, (r) => {
            if (r.response) {
                this.setState({
                    descriptionChange: this.state.descriptionChange,
                })
            }
        });
    };
    handleSendComment = () => {
        const { photoId } = this.props;
        //eslint-disable-next-line no-undef
        VK.Api.call('photos.createComment', {photo_id: photoId, message: this.state.commentChange, v: "5.87"}, (r) => {
            if(r.response) {
                this.setState({
                    commentChange: this.state.commentChange,
                })
            } else {
                console.log('error')
            }
        });
    }
}

export { Photocard }