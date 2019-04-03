import React, { Component, Fragment } from 'react';
import domtoimage from 'dom-to-image';
import './App.css';

class App extends Component {
  state = {
    imageUrl: 'https://s2.glbimg.com/Rj3bHJ62DLES2Gk6wcNxkBNlJ48=/1200x/smart/filters:cover():strip_icc()/s03.video.glbimg.com/x720/2535726.jpg',
    source: 'g1.globo.com',
    headline: 'Governo gasta dez vezes mais com Previdência que com educação, diz Guedes; veja AO VIVO',
    byline: 'Ministro da Economia compareceu à Comissão de Constituição e Justiça da Câmara para prestar esclarecimentos sobre a proposta de reforma da Previdência.',
    downloadUrl: ''
  }

  field = (label, name) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input
          type="text"
          value={this.state[name]}
          onChange={(e) => this.setState({ [name]: e.target.value })} />
      </div>
    )
  }

  onDownload = () => {
    domtoimage.toPng(this.resultRef).then((data) => {
      this.setState({ downloadUrl: data }, () => this.downloadRef.click())
    })
  }

  download = () => {
    const { downloadUrl } = this.state;

    return (
      <Fragment>
        <button className="download" onClick={this.onDownload}>Download</button>
        <a
          href={downloadUrl}
          style={{ display: 'none' }}
          ref={(r) => this.downloadRef = r}
          download="fb-news.png"
        >
        </a>
      </Fragment>
    )
  }

  result = () => {
    const { imageUrl, source, headline, byline } = this.state

    return (
      <div className="result-container">
        <div className="result" ref={(r) => this.resultRef = r}>
          <div className="img">
            <img src={`//images.weserv.nl/?url=${imageUrl}`} alt=""/>
          </div>

          <div className="text">
            <div className="close"></div>
            <div className="source">{source}</div>
            <div className="headline">{headline}</div>
            <div className="byline">{byline}</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.field('Imagem', 'imageUrl')}
        {this.field('Fonte', 'source')}
        {this.field('Headline', 'headline')}
        {this.field('Byline', 'byline')}
        {this.download()}
        <hr/>
        {this.result()}
      </div>
    );
  }
}

export default App;
