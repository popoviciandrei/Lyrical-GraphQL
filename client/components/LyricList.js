import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/likeLyric';

class LyricList extends Component {


    likeLyric(id, likes) {
        this.props.mutate({
            variables: { id },
            // add optimistic response
            // we inject the response that we think it will come back
            // that is overwritten when the server response comes back
            // with the real data values
            optimisticResponse: {
                __typename: "Mutation",
                likeLyric: {
                    id: id,
                    __typename: "LyricType",
                    likes: likes + 1
                }
            }
        });
    }

    /**
     * Render lyrics
     */
    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="voteBox">
                        {likes}
                        <i onClick={() => this.likeLyric(id, likes)}
                            className="material-icons">thumb_up</i>
                    </div>
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

export default graphql(mutation)(LyricList);