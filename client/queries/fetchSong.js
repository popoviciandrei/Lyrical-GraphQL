import gql from 'graphql-tag';

export default gql`
    query SongQuqery($id: ID!) {
        song(id: $id) {
            id
            title
        }
    } 
`;