import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import ItemDetail from './ItemDetail';

class ItemList extends Component {
    state = { items: [] };


    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ items: response.data}));

    }

    renderItem(){
        return this.state.items.map(items => 
            <ItemDetail key={items.title} items={items}/>
        );
    }


    render(){
        console.log(this.state);

        return (
            <ScrollView>
                {this.renderItem()}
            </ScrollView>
        );
    }
}

export default ItemList;