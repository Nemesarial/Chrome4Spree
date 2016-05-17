chrome.storage.sync.get('enable_github_integration', function (items) {
  // Here You can type your custom JavaScript...
  var urlCheck = function () {
    urlCheck.busy = typeof (urlCheck.busy) == 'undefined' ? false : urlCheck.busy
    console.log('urlCheck busy', urlCheck.busy)
    if (urlCheck.busy) return

    urlCheck.busy = true

    // Making a new pull-request
    if (URLTools.contains('compare')) {
      let pair = $('.range-cross-repo-pair .commitish-suggester .css-truncate-target')
      if (pair.length != 2) {urlCheck.busy = false; return;}
      if (pair.get(0).title.split(':')[1].trim() == 'master') {
        let buttons = $('#new_pull_request .form-actions button[type=submit]').add('.compare-pr-placeholder > button.js-details-target')
        console.clear()
        console.log('compare', buttons)
        buttons.text('CREATE PULL REQUEST TO MASTER - ARE YOU SURE ?')
        buttons.css('backgroundImage', 'linear-gradient(#CE8383, #a10000)')
        buttons.css('borderColor', '#a10000')
      }
    }

    // Merging a pull request to master
    if (URLTools.contains('/pull/')) {
      let container = $('.css-truncate.user-select-contain')
      if (container.length < 1) {urlCheck.busy = false; return;}
      if (container.get(0).title.split(':')[1].trim() == 'master') {
        let button = $('.js-merge-branch-action')
        button.text('MERGE TO MASTER - ARE YOU SURE ?')
        button.css('backgroundImage', 'linear-gradient(#CE8383, #a10000)')
        button.css('borderColor', '#a10000')
      }
    }

    if (URLTools.contains('/pull/') && URLTools.contains('/files') || URLTools.contains('/compare/')) {
      let q=URLTools.getQuery();
      let s,u
      if(q.hasOwnProperty('w')){
        s='Show Whitespace Diff'
        u=URLTools.makeUrlQuery({},['w'])
      }else{
        s='Hide Whitespaces Diff'
        u=URLTools.makeUrlQuery({w:0})
      }
      
      let e
      $('[data-c4s-wstoggle]').remove()
      if(URLTools.contains('/compare/')){
        e=$(`<div class="right" data-c4s-wstoggle style="margin-left:15px;"><a class="btn btn-sm" href="${u}">${s}</a></div>`)
        e.insertBefore('#toc .right')
      }else{
        e=$(`<div class="right" data-c4s-wstoggle style="margin-top:-3px; margin-left:15px;"><a class="btn btn-sm" href="${u}">${s}</a></div>`)
        e.insertBefore('.diffbar .right')
      }
      
      console.log(s,u)
    }    
    

    urlCheck.busy = false
  }


 /************************************************************************************** /
 // Jira links
 
  var textNodesUnder = function (el) {
    var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false)
    while(n = walk.nextNode()) a.push(n)
    return a
  }
  
  var jiraLinks=function(){
      
  }
/**************************************************************************************/



  if (items.enable_github_integration) {
    console.log('enable_github_integration enabled')
    document.getElementById('js-repo-pjax-container').addEventListener('DOMNodeInserted', urlCheck)
    urlCheck()
  }
})
