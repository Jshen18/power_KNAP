import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import Search from './Search';
import SearchResults from './SearchResults';
import sampleVideoData from '../../../../db/sampleVideoData';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.searchResults[0],
      searchResults: props.searchResults,
      query: '',
      playlist: sampleVideoData.slice(1),
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    // Make API call to youtube
    // .then(videos => {
    // this.setState({
    //   searchResults: videos
    //   query: ''
    // })})
  }

  updateQuery(event) {
    this.setState({
      query: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h3>Room</h3>
        <VideoPlayer video={this.state.currentVideo} />
        <Playlist playlist={this.state.playlist} />
        <Search updateQuery={this.updateQuery} search={this.search} />
        <SearchResults searchResults={this.state.searchResults} />
      </div>
    );
  }
}

RoomView.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ReactDOM.render(<RoomView searchResults={sampleVideoData} />, document.getElementById('room'));