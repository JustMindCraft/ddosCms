import React from 'react';
import { Link, withRouter } from 'react-router-dom';
const SourceListLink = (props:any) =>  <Link to={"/admin/"+props.match.params.source} {...props} />

export default withRouter(SourceListLink)
