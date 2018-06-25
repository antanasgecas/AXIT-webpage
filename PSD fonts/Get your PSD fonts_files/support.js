supportPlugin = {
    container: null,
    openInNewTab: function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },
    createPane: function(content){
        var glass               = document.createElement('div');
        glass.style.position    = 'fixed';
        glass.style.top         = '0';
        glass.style.bottom      = '0';
        glass.style.left        = '0';
        glass.style.right       = '0';
        glass.style.margin      = '0';
        glass.style.padding     = '0';
        glass.style.width       = '100%';
        glass.style.height      = '100%';
        glass.style.background  = 'rgba(0,0,0,0.7)';
        glass.style.display     = 'table';
        
        var paneContainer                   = document.createElement('div');
        paneContainer.style.display         = 'table-cell';
        paneContainer.style.verticalAlign   = 'middle';
        paneContainer.style.textAlign       = 'center';
        
        var pane                = document.createElement('div');
        pane.style.display      = 'inline-block';
        pane.style.border       = '1px solid #ccc';
        pane.style.background   = '#eee';
        pane.style.color        = '#333';
        pane.style.maxWidth     = screen.width <= 699 ? '90vw' : '60vw';
        pane.style.maxHeight    = '90vh';
        pane.style.overflow     = 'auto';
        pane.innerHTML          = content;
        
        pane.onclick = function(e){ e.stopPropagation(); };
        glass.onclick = function(){ this.parentNode.removeChild(this); };
        
        paneContainer.appendChild(pane);
        glass.appendChild(paneContainer);
        document.body.appendChild(glass);
    },
    sendMail: function(form){
        form.getElementsByClassName('support-mail-submit')[0].disabled = true;
        var elements = form.getElementsByClassName('send-mail');
        var formData = new FormData(); 
        for(var i=0; i<elements.length; i++)
            formData.append(elements[i].name, elements[i].value);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState == 4){ //  && xmlHttp.status == 200
                form.getElementsByClassName('support-mail-submit')[0].removeAttribute('disabled');
                form.getElementsByClassName('support-form-msg')[0].innerHTML = xmlHttp.responseText;
            }
        };
        xmlHttp.open('post', window.location.origin+'/common/support/mail.php'); 
        xmlHttp.send(formData); 
    },
    init: function(stickTo1, stickTo2, isAbsolute, distance1, distance2){
        this.container                                          = document.createElement('div');
        this.container.style.position                           = isAbsolute ? 'absolute' : 'fixed';
        this.container.style[stickTo1 ? stickTo1 : 'bottom']    = distance1 ? distance1 : '2px';
        this.container.style[stickTo2 ? stickTo2 : 'right']     = distance2 ? distance2 : '2px';
        this.container.style.border                             = '1px solid #ccc';
        this.container.style.background                         = '#eee';
        this.container.style.color                              = '#333';
        this.container.style.padding                            = '1px 6px';
        
        document.body.appendChild(this.container);
    },
    addMail: function(code, subject, btnText, btnClasses, btnTooltip){
        var btn             = document.createElement('button');
        btn.role            = 'button';
        btn.style.float     = 'left';
        btn.innerHTML       = btnText ? btnText : '<img src="https://giovannimuzzolini.com/common/support/mail.png" title="Send email" style="width: 24px; height: 24px; float: left;"/>';
        btn.className       = btnClasses ? btnClasses : '';
        btn.style.margin    = '4px';
        btn.style.cursor    = 'pointer';
        btn.style.padding   = '0';
        btn.onclick         = function(){ supportPlugin.createPane(
            '<form onsubmit="event.preventDefault(); supportPlugin.sendMail(this);" style="text-align: center; padding: 10px 0;">'
            + '<input class="send-mail" type="text" name="from" placeholder="Your email address (if you want a response)" style="width: 90%; margin: 4px;"/>'
            + (subject ? '<input class="send-mail" type="hidden" name="subject" value="'+subject+'"/>' : '<input class="send-mail" type="text" name="subject" placeholder="Subject" required style="width: 90%; margin: 4px;"/>')
            + (code ? '<input class="send-mail" type="hidden" name="code" value="'+code+'"/>' : '')
            + '<textarea class="send-mail" name="message" placeholder="Message" rows="4" required style="width: 90%; margin: 4px;"></textarea>'
            + '<input class="support-mail-submit" type="submit" value="Submit" style="width: 90%; margin: 4px;"/>'
            + '<div class="support-form-msg"></div></form>'
        ); };
        if(btnTooltip) btn.title = btnTooltip;
        
        this.container.appendChild(btn);
    },
    addDonate: function(btnText, btnClasses, btnTooltip){
        var btn             = document.createElement('button');
        btn.role            = 'button';
        btn.style.float     = 'left';
        btn.innerHTML       = btnText ? btnText : '<img src="https://giovannimuzzolini.com/common/support/beer.png" title="Buy me a beer!" style="width: 24px; height: 24px; float: left;"/>';
        btn.className       = btnClasses ? btnClasses : 'Buy me a beer!';
        btn.style.margin    = '4px';
        btn.style.cursor    = 'pointer';
        btn.style.padding   = '0';
        btn.onclick         = function(){ supportPlugin.openInNewTab('https://paypal.me/giovannimuzzolini'); };
        if(btnTooltip) btn.title = btnTooltip;
        
        this.container.appendChild(btn);
    }
};