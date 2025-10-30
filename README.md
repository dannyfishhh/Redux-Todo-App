<br />
<div align="center">

  <h2 align="center">Redux Todo App</h2>

  <p align="center">
** Refine this into  components before. Good to highlight how to commands to set up a local server, how to install the packages from fresh and running unit tests

This application makes use of a Redux Store in order to handle state changes occuring in components throughout the application.

The default screen is for 3 todos but as add, remove, complete, and so forth, your own todos will be persisted in the localStorage.

There is unit testing for all of the Redux Slice logic, component testing to check the each element renders properly within each component, and changes under the correct circumstances, and also integration testing to check these elements render under the relevant user events.

The styling should be responsive to all sizes from a large laptop through to an iPhone SE.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
        <li><a href="#documents">Links to Associated Documents</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#functional">Functional Components</a></li>
    <ul>
        <li><a href="#unit">Unit Testing</a></li>
        <li><a href="#manual">Manual Testing</a></li>
    </ul>
    </li>
    <li><a href="#secrets">Secrets</a></li>
    <li><a href="#secrets">Troubleshooting</a></li>
  </ol>
</details>

## Links to useful documents

Any supporting docs etc


### Pre-requisites

The vault pass for this Integration can be request from aais or the HR team.

- .vault pass - LastPass/hrst vaultpass

## Deployment

How to deploy here. I would look at ways to host a deployed version for free

### Logs

Add links to logs if needed

## Functional Components

### Architecture overview

Could add a diagram of how the site works. Optional

### Unit Testing 

All Unit tests can be initiated in the command line:

```sh
<Insert command here >
```

   
## Secrets

<!-- Add any secrets that are needed. This would be mainly when you set up backend api or database calls if needed -->

## Troubleshooting

error when starting dev server:
TypeError: crypto.hash is not a function

Certain node versions have API's and functions not available. Need to use node 20.X LTS version

nvm install 20
nvm use 20

rm -rf node_modules package-lock.json
npm install
npm run dev

<!-- Add any secrets that are needed. This would be mainly when you set up backend api or database calls if needed -->


<p align="right">(<a href="#readme-top">back to top</a>)</p>


