import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
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
                <h3>{song.title}</h3>
                <LyricList songId={song.id} lyrics={song.lyrics} />
                <LyricCreate songId={song.id} />

            </div>
        )
    }
}



export default graphql(query, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);