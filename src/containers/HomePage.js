import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { updateChartData } from '../actions/app';

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChartData: (data) => {
      dispatch(updateChartData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
