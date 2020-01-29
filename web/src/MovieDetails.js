import React, {Component} from 'react';
import Axios from 'axios';

class MovieDetails extends Component {
    state = {
        movie: undefined
    };

    componentDidMount() {
        Axios.get(`/api/movies/${this.props.match.params.id}`)
            .then((result) => {
                this.setState({movie: result.data});
            })
    }

    render() {
        return (
            <div>
                {this.state.movie ?
                    <div>
                        <h1>{this.state.movie.movie_title}</h1>
                        <p>Directed by: {this.state.movie.director_name}</p>
                        <p>Year: {this.state.movie.title_year}</p>
                        <a href={this.state.movie.movie_imdb_link}>IMdB link</a>
                    </div>
                    :
                    <p>No movie details</p>
                }
            </div>
        );
    }
}

export default MovieDetails;