import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { postNewVideoBookmark } from '../linkApi';

class PostVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      show: false,
      url: '',
      tags: '',
    };
  }

  async createVideoBookmark() {
    const bm = this.state;
    const tagList = bm.tags.split(' ');
    await postNewVideoBookmark(bm.url, tagList).then(() => {
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
      <div className="PostVideo">
        <Card bg="secondary" text="white" className='m-3'>
          <Card.Header>
            <h1>Add a new Video</h1>
          </Card.Header>
          <Card.Body>
            <h2>Simply fill the fields below and validate to add a new bookmark</h2>
            <Form>
              <Form.Group controlId="addBookmarkVideoUrl">
                <Form.Label>
                  <strong>
                    URL:
                  </strong>
                </Form.Label>
                <Form.Control type="url" placeholder="Enter URL" onChange={(event) => this.setState({ url: event.target.value })}/>
              </Form.Group>
              <Form.Group controlId="addBookmarkVideoTags">
                <Form.Label>
                  <strong>
                    Tags:
                  </strong>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter tags, Tags will be split by spaces" onChange={(event) => this.setState({ tags: event.target.value })}/>
              </Form.Group>
              <Button variant="success" onClick={ (e) => this.createVideoBookmark(e) }>Create Bookmark</Button>
              <Button variant="danger" className="ml-3" onClick={(e) => this.redirectHome(e) }>Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PostVideo;
