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

  const visiableList = all[params.filter];
  return (
    <>
      {Object.keys(visiableList).map((dir) => (
        <div>
          <div className="list-dir">{dir}</div>
          {visiableList[dir].map((item) => {
            const { title, description, path, name } = item;
            return <ListItem title={title} description={description} path={path} name={name} />;
          })}
        </div>
      ))}
    </>
  );
};

export default connect(mapStateToProps)(ListContainer);
