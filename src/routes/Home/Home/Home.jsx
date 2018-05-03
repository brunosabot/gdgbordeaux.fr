// @flow
import * as React from "react";
import firebase from "../../../config/firebase";
import type { Reference } from "firebase/database";
// import type { Reference } from "../../../../flow-typed/firebase/database";

import Card from "../../../components/functionnal/navigation/Card";
import CardContainer from "../../../components/ui/card/CardContainer";
import Hero from "../../../components/ui/layout/Hero";
import Footer from "../../../components/ui/footer/Footer";

type Post = {
  content: string[],
  date: string,
  image: string,
  title: string,
  favorites?: { [string]: string }
};

type Props = {};

type State = {
  data: { [string]: Post }
};

class Home extends React.PureComponent<Props, State> {
  firebaseRef: Reference;
  firebaseCallback: () => void;
  state = {
    data: {}
  };

  componentDidMount() {
    this.firebaseRef = firebase.database().ref("/posts");
    this.firebaseCallback = this.firebaseRef.on("value", snap => {
      this.setState({ data: snap.val() });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off("value", this.firebaseCallback);
  }

  render(): React.Node {
    const data: string[] = Object.keys(this.state.data);

    return (
      <React.Fragment>
        <Hero>Google Developer Group Bordeaux</Hero>
        <CardContainer>
          {data.map(key => <Card key={key} id={key} {...this.state.data[key]} />)}
        </CardContainer>
        <Footer>
          <span />
          <span />
        </Footer>
      </React.Fragment>
    );
  }
}

export default Home;
