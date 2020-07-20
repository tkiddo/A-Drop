// eslint-disable
import React, { lazy, Suspense } from 'react';
import './index.scss';

const MdContainer = (props) => {
  const {
    match: { params }
  } = props;
  const path = params.path.replace(/_/g, '/');
	const Md = lazy(() => import(`../../md/${path}`));
  return (
    <Suspense fallback={<div className="modal-loading">loading...</div>}>
      <Md />
    </Suspense>
  );
};

export default React.memo(MdContainer);
