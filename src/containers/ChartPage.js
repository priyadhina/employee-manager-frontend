import { connect } from 'react-redux';
import ChartPage from '../components/ChartPage';
import { fetchData } from '../actions/app';

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => {
      dispatch(fetchData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
