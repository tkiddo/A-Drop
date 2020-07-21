import React from 'react';
// eslint-disable-next-line import/no-unresolved
import './index.scss';
import { connect } from 'react-redux';
import ListItem from './ListItem';

const mapStateToProps = ({ markdown }) => ({
  markdown
});

const ListContainer = (props) => {
  const {
    match: { params },
    markdown: { all }
  } = props;

  const visiableList = all.filter((item) => item.meta === params.filter);
  return (
    <>
      {visiableList.map((item) => {
        const {
          title, description, path, name
        } = item;
        return <ListItem title={title} description={description} path={path} name={name} />;
      })}
    </>
  );
};

export default connect(mapStateToProps)(ListContainer);
