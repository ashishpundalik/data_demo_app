import { connect } from 'react-redux';

import Blog from '../components/Blog.jsx';

let mapStateToProps = (state, ownProps) => {
  return state;
}

let BlogContainer = connect(mapStateToProps, null)(Blog);

export default BlogContainer;
