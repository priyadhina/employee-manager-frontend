const generateInitialChartData = () => {
  const currentYear = new Date().getFullYear();
  const chartData = {};
  for (var i = 0; i < 10; i++) {
    chartData[currentYear - i] = 0;
  }

  return chartData;
};

const initialState = {
  chartData: generateInitialChartData(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        chartData: { ...state.chartData, ...action.payload.chartData },
      };
    case 'UPDATE_CHART_DATA':
      const { year, mode } = action.payload;
      if (mode === 'add') state.chartData[year] = state.chartData[year] + 1;
      else if (mode === 'delete')
        state.chartData[year] = state.chartData[year] - 1;
      return {
        ...state,
      };
    default:
      return state;
  }
};
