const express = require('express')
const app = express()
const axios = require('axios');
const org_pat_map = require('./config.json')
const port = 3000

const env_list = process.env
for(var i in env_list) {
    if(i.includes('PAT_')){
        org_pat_map[i.replace('PAT_', '')] = env_list[i].trim()
    }
}

app.get('/repo/:github_repo_owner/:github_repo_name/registration-token', (req, res) => {
    const registration_token_url= `https://api.github.com/repos/${req.params.github_repo_owner}/${req.params.github_repo_name}/actions/runners/registration-token`
    const github_pat = org_pat_map[`${req.params.github_repo_owner}`]
    const headers = {
        'Authorization': `token ${github_pat}`
    }
    axios.post(registration_token_url,{},{headers: headers})
    .then((github_res) => {
        res.send(github_res['data']['token'])
    })
})

app.get('/repo/:github_repo_owner/:github_repo_name/remove-token', (req, res) => {
    const remove_token_url= `https://api.github.com/repos/${req.params.github_repo_owner}/${req.params.github_repo_name}/actions/runners/remove-token`
    console.log(remove_token_url)
    const github_pat = org_pat_map[`${req.params.github_repo_owner}`]
    const headers = {
        'Authorization': `token ${github_pat}`
    }
    axios.post(remove_token_url,{},{headers: headers})
    .then((github_res) => {
        res.send(github_res['data']['token'])
    })
})

app.get('/:github_org_name/registration-token', (req, res) => {
    const registration_token_url= `https://api.github.com/orgs/${req.params.github_org_name}/actions/runners/registration-token`
    const github_pat = org_pat_map[`${req.params.github_org_name}`]
    const headers = {
        'Authorization': `token ${github_pat}`
    }
    axios.post(registration_token_url,{},{headers: headers})
    .then((github_res) => {
        res.send(github_res['data']['token'])
    })
})

app.get('/:github_org_name/remove-token', (req, res) => {
    const remove_token_url= `https://api.github.com/orgs/${req.params.github_org_name}/actions/runners/remove-token`
    const github_pat = org_pat_map[`${req.params.github_org_name}`]
    const headers = {
        'Authorization': `token ${github_pat}`
    }
    axios.post(remove_token_url,{},{headers: headers})
    .then((github_res) => {
        res.send(github_res['data']['token'])
    })
})

app.listen(3000);
