
var WeatherForm = React.createClass({
  getInitialState: function () {
    return { city: 'waterloo' };
  },
  handleCityChange: function (e) {
    this.setState({ city: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var city = this.state.city.trim();
    this.props.onCitySubmit({ city: city, isSubmitClicked: true });
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="input a city" value={this.state.city} onChange={this.handleCityChange}/>
        <button className="button">Search</button>
      </form>
    );
  }
});

var WeatherLocation = React.createClass({
  render: function () {
    return (
      <h5>{this.props.location}</h5>
    );
  }
});

var WeatherList = React.createClass({
  render: function () {
    var weatherNodes = this.props.data.map(function (weather, index) {
      return (
        <div className="forecast" key={index}>
          <Weather temp={(weather.main.temp - 272.15).toFixed(2) } image={weather.weather[0].icon} description={weather.weather[0].description} date={weather.dt_txt}>
          </Weather>
        </div>
      );
    });
    return (
      <div className="forecast-wrapper">
        {weatherNodes}
      </div>
    );
  }
});

var Weather = React.createClass({
  render: function () {
    return (
      <div className="forecast-list">
        <img className="animate" src={"http://openweathermap.org/img/w/" + this.props.image + ".png"} />
        <h3>{this.props.temp}</h3>
        <span>{this.props.description}</span>
        <br />
        <span className="date">{this.props.date}</span>
      </div>
    );
  }
});

var AppFooter = React.createClass({
  render: function () {
    return (
      <footer className={(this.props.clickState ? ' reset' : '') }>
        <p>design&nbsp; <a href="http://echoyu.com">&#10084; &nbsp; </a>with Echo</p>
      </footer>
    );
  }
});

var WeatherView = React.createClass({
  getInitialState: function () {
    return { data: [], location: [], isClick: this.props.initialClick };
  },
  handleCitySubmit: function (res) {
    this.loadWeatherFromServer(res.city);
    this.loadLocationFromServer(res.city);
    var newState = res.isSubmitClicked;
    this.setState({ isClick: newState });
    this.props.callBackClick(newState);
  },
  loadWeatherFromServer: function (city) {
    $.ajax({
      url: this.props.url + city,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data.list });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadLocationFromServer: function (city) {
    $.ajax({
      url: this.props.url + city,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ location: data.city.name + ', ' + data.city.country });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className={"weather-container" + (this.state.isClick ? ' reset' : '') }>
        <h1>Weather App</h1>
        <WeatherForm onCitySubmit={this.handleCitySubmit} />
        <WeatherLocation location={this.state.location} />
        <WeatherList data={this.state.data} />
      </div>
    );
  }
});

var AppView = React.createClass({
  getInitialState: function () {
    return { isClick: false };
  },
  onClickChange: function (newState) {
    this.setState({ isClick: newState });
  },
  render: function () {
    return (
      <div className="wrapper" id="this.state.isClick">
        <div>
          <WeatherView url="/city/" initialClick={this.state.isClick} callBackClick={this.onClickChange}/>
          <AppFooter clickState={this.state.isClick}/>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <AppView />,
  document.getElementById('react-app')
);