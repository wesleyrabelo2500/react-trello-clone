import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  background: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ba8468f4-fd93-431e-85a2-5cff99ac11c0/ddsng7u-0fc8f5fa-af5f-4e7a-b4a4-9a1be6be5d29.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JhODQ2OGY0LWZkOTMtNDMxZS04NWEyLTVjZmY5OWFjMTFjMFwvZGRzbmc3dS0wZmM4ZjVmYS1hZjVmLTRlN2EtYjRhNC05YTFiZTZiZTVkMjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9mJ2brbb5vGiFxud0QenX7opDo1Qql3zmlCngpoqH88)
}

#root {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;


  h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0;
  }


  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
}


* {
  box-sizing: border-box;
}

.ant-modal {
  &-body {
    display: flex;   
    padding-top: 0!important;
  }
  &-header {
    display: flex;
    border-bottom: none!important;
  }
  &-footer {
    border-top: none!important;
  }
  &-title {
    width: 100%;
  }
}

.card-label {
  &-green {
    background: #61bd4f;
  }
  &-yellow {
    background: #f2d600;
  }
  &-orange {
    background: #ff9f1a;
  }
  &-red {
    background: #eb5a46;
  }
  &-purple {
    background: #c377e0;
  }
  &-blue {
    background: #0079bf;
  }
}
.login-buttons{
  display: flex;
  flex-direction:column;
  align-items: center;
}

`;
