export const fetchData = (data) => {
  return {
    type: 'FETCH_DATA',
    payload: data,
  };
};

export const updateChartData = (data) => {
  return {
    type: 'UPDATE_CHART_DATA',
    payload: data,
  };
};
