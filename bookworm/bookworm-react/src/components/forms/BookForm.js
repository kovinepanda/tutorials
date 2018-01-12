import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Grid } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.authors) errors.authors = "Can't be blank";
    if (!data.pages) errors.pages = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Grid column={2}>
          <Grid.Row>
            <Grid.Column>
              <Form.Field error={!!errors.title}>
                <label htmlFor="title">Book title</label>
                <input
                  type="text"
                  id="title"
                  name="ema"
                  placeholder="example@your.email"
                  value={data.email}
                  onChange={this.onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number.isRequired
  }).isRequired
};

export default BookForm;
