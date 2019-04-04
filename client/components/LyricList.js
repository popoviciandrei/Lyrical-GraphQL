import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/likeLyric';

class LyricList extends Component {


    renderLyrics() {
        return this.props.lyrics.map(({ id, content }) => {
            const likesCount = likes ? (
                <span>{likes}</span>
            ) : '';
            return (
                <li key={id} className="collection-item">
                    {content} - {id} {likesCount}
                    <i
                        className="material-icons">thumb_up</i>

                </li>
            )
        });
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default LyricList;