import React, {Component} from 'react';

export default class PokemonModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: null,
        }
        this.getPokemonInfo = this.getPokemonInfo.bind(this);
    }

    componentDidMount() {
        this.getPokemonInfo(this.props.pokemon.url);
    }

    getPokemonInfo = (url) => {
        let info = {}
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                info['abilities'] = data.abilities;
                info['name'] = data.name;
                this.setState({
                    info: info
                })
            });
    }

    render() {
        const abilities = this.state.info;
        console.log(abilities);
        return (
            <div className="modal fade" id={"pokemonModal" + this.props.index} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.pokemon.name.toUpperCase()}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { this.state.info ?
                                <div>
                                    {this.state.info.name}
                                    <ul>
                                    {this.state.info.abilities.map((item, i) => {
                                       return <li key={i}>{item.ability.name}</li>
                                   })}
                                    </ul>
                                </div>
                                :
                                <div>
                                    Loading...
                                </div>
                                }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}