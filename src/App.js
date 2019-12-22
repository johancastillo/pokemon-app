import React, {Component} from 'react';
import PokemonModal from "./components/PokemonModal/PokemonModal";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            next: null,
            previous: null,
            pokemons: []
        }
    }

    componentDidMount() {
        this.getPokemon("https://pokeapi.co/api/v2/pokemon")
    }

    getPokemon = url => {
        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    count: resp.count,
                    next: resp.next,
                    previous: resp.previous,
                    pokemons: resp.results,
                })
            })
    }

    render() {
        const pokemons = this.state.pokemons.map((pokemon, index) => {
            return (
                <li key={index} className="list-group-item">{pokemon.name.toUpperCase()}
                    <div className="dropdown float-right">
                        <button className="btn btn-light" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-v"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target={"#pokemonModal"+index}>Show Info</a>
                        </div>
                    </div>
                    <PokemonModal index={index} pokemon={pokemon} />
                </li>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Pokemon</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className={"btn btn-info float-left " + (this.state.previous==null? "disabled":"")} onClick={() => this.getPokemon(this.state.previous)}>Previous</button>
                        <button className={"btn btn-info float-right " + (this.state.next==null? "disabled":"")} onClick={() => this.getPokemon(this.state.next)}>Next</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        &nbsp;
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="list-group">
                            {pokemons}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}