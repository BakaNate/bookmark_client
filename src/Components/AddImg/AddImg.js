import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { postNewImgBookmark } from '../linkApi';

class PostImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      show: false,
      url: '',
      tags: '',
    };
  }

  async createImgBookmark() {
    const bm = this.state;
    const tagList = bm.tags.split(' ');
    await postNewImgBookmark(bm.url, tagList).then(() => {
      this.setState({ redirect: true });
    });
  }

  redirectHome() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { referrer: this.state },
        }}> </Redirect>
      );
    }
    return (
      <div className="PostImg">
        <Card bg="secondary" text="white" className='m-3'>
          <Card.Header>
            <h1>Add a new Image</h1>
          </Card.Header>
          <Card.Body>
            <h2>Simply fill the fields below and validate to add a new bookmark</h2>
            <Form>
              <Form.Group controlId="addBookmarkImgUrl">
                <Form.Label>
                  <strong>
                    URL:
                  </strong>
                </Form.Label>
                <Form.Control type="url" placeholder="Enter URL" onChange={(event) => this.setState({ url: event.target.value })}/>
              </Form.Group>
              <Form.Group controlId="addBookmarkImgTags">
                <Form.Label>
                  <strong>
                    Tags:
                  </strong>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter tags, Tags will be split by spaces" onChange={(event) => this.setState({ tags: event.target.value })}/>
              </Form.Group>
              <Button variant="success" onClick={ (e) => this.createImgBookmark(e) }>Create Bookmark</Button>
              <Button variant="danger" className="ml-3" onClick={(e) => this.redirectHome(e) }>Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PostImg;
