import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import gql from 'graphql-tag';

class SongDetail extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '', renderEditForm: false };
    }

    /**
     * Submit the new song title
     * @param {*} event
     */
    onSubmit(event) {
        this.props.mutate({
            variables: {
                id: this.props.data.song.id,
                title: this.state.title
            }
        }).then(() => {
            this.setState({ renderEditForm: false })
        });
    }

    /**
     * Render title or edit title form
     */
    renderTitleEditForm() {
        const { loading, song } = this.props.data;

        if (loading) { return; }

        if (this.state.renderEditForm) {
            return (
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-fields col s6">
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.state.title}
                                    onChange={event => this.setState({ title: event.target.value })} />
                            </div>
                        </div>
                        <div className="row">

                            <div className="input-field col s6">
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                                <button className="btn waves-effect waves-light" onClick={() => {
                                    this.setState({
                                        renderEditForm: false
                                    })
                                }}>Cancel
                                    <i className="material-icons right">cancel</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )
        } else {
            return (
                <div>
                    <h3>{song.title} <i
                        className="material-icons"
                        onClick={() => {
                            this.setState({
                                title: song.title,
                                renderEditForm: true
                            })
                        }} >edit</i>
                    </h3>

                </div>
            );
        }


    }

    render() {

        const { loading, song } = this.props.data;

        if (loading) {
            return <div>loading...</div>;
        }

        return (
            <div>
                <Link to='/' className="waves-effect waves-light btn red">
                    <i className="material-icons left">keyboard_arrow_left</i>
                    Back
                </Link>
                {this.renderTitleEditForm()}
                <LyricList songId={song.id} lyrics={song.lyrics} />
                <LyricCreate songId={song.id} />

            </div>
        )
    }
}

const mutation = gql`
    mutation UpdateSong($id:ID!, $title:String) {
                        updateSong(id: $id, title:$title) {
                        id,
                    title,
            lyrics {
                        id
                likes
                    content
                }
            }
        }
    `;

export default graphql(mutation)(
    graphql(query, { options: (props) => { return { variables: { id: props.params.id } } } })(SongDetail)
);