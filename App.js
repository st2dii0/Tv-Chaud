import React from 'react';
const axios = require('axios');
import { ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: '',Movies: []};
  }
  search4movie = () =>{
    axios.get(`http://api.tvmaze.com/search/shows?q=${this.state.search}`)
    .then(response => {
      let movieList = response.data.map(value => {
        return value.show.name;
      });
      this.setState({Movies: movieList});
      // console.log(movieList);
      // console.log(this.state.Movies);      
    })
    .catch(function (err) {
      console.log(err);
    })

    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Tv-Maze</Text>
        <View style={[{flex: 1}, styles.elementsContainer]}>
          <View style={{flex: 1, backgroundColor: ''}}>
            <TextInput
                style={{height: 100}}
                placeholder="Search movie"
                onChangeText={(search) => this.setState({search})}
                value={this.state.search}
            />
            <TouchableOpacity onPress={()=>{this.search4movie()}}> 
              <View>
                <Text>search</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 3, backgroundColor: ''}}>
            {this.state.Movies.map(film =>{
              return <SearchResult film = {film}  />
            })}

            {/* {this.state.Movies.map(value =>{
              return <Text>{value}</Text>
              // console.log(value);
            })} */}
        </View>
          <SearchResult/>         
        </View>
      </View>
    );
  }
}

class SearchResult extends React.Component{
  render(){
    return(
      <View>
        <Text> {this.props.film} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 42,
    backgroundColor: 'lightblue',
    flex: 1,
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
