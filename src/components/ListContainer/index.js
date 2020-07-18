import React from 'react';
// eslint-disable-next-line import/no-unresolved
import './index.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      {visiableList.map((item) => (
        <Link key={item.name} to={`/md/${item.path}`}>
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default connect(mapStateToProps)(ListContainer);
