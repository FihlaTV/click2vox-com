module.exports = {
  'Checks if widget creation works properly': function(browser) {

    var demoEmail = process.env.DEMO_USER_EMAIL || 'demo.widget@click2vox.com';
    var demoSipUri = 'digits@ivrs';
    var demoPassword = 'password';

    browser
      .url(browser.launchUrl + '/login') // first we need to log in
      .waitForElementVisible('body', 1000)

      // then we need to input the values
      .assert.visible('input[name="uemail"]')
      .assert.visible('input[name="upassword"]')
      .setValue('input[name="uemail"]', demoEmail)
      .setValue('input[name="upassword"]', demoPassword)
      .click('button#login')
      .pause(1000)
      .url(browser.launchUrl + '/widget/new')

      // now we should be in "create new Button" screen
      .pause(1000)
      .assert.containsText('body', 'Create a WebRTC Click-to-Call Button')

      // let's fill all the inputs to see if it works
      .setValue('input[name="configuration_name"]', 'My_Test_Button')
      .setValue('input[name="button_label"]', 'Call_our\'s_this_Test!')
      .setValue('select[name="sip_uri"]', demoSipUri)
      .click('button.btn-style-b')

      // let's set some advanced configurations
      .click('a[href="#collapseAdvancedCallConfiguration"]')
      .setValue('input[name="caller_id"]', 'This_is_the_test_bot')
      .setValue('input[name="context"]', '12context34')
      .setValue('input[name="send_digits"]', '1,2,3,1200ms,4,5,900ms,6,#')

      // now for incompatible browsers
      .click('a[href="#collapseIncompatileBrowserConfiguration"]')
      .click('label.show_text_html')
      .click('.options-wrap.active.incompatible .form-group:nth-child(3) label')

      .setValue('input[name="incompatible_browser_configuration"]', 'show_text_html')
      .clearValue('textarea[name="show_text_html_value"]')
      .setValue('textarea[name="show_text_html_value"]', 'Incompatible_browser')

      // saving configuration
      .click('button[id="saveConfig"]')

      // refresh page
      .pause(5000)

      // now check values in widget code
      .assert.containsText('#widget_code pre', 'data-text="' + escape('Call_our\'s_this_Test!') + '"')
      .assert.containsText('#widget_code pre', 'data-caller_id="This_is_the_test_bot"')
      .assert.containsText('#widget_code pre', 'data-send_digits="1,2,3,1200ms,4,5,900ms,6,#"')
      .assert.containsText('#widget_code pre', 'data-context="12context34"')
      .assert.containsText('#widget_code pre', 'data-div_css_class_name="style-b"')
      .assert.containsText('#widget_code pre', 'data-incompatible_browser_configuration="show_text_html"')

      //redirect to widgets lits and delete button
      .url(browser.launchUrl + "/account/widgets")
      .click('.deleteButton')
      .pause(500)

      //hits 'tab' twice and then hits 'enter', to confirm widget deletion on modal
      .keys(['\uE004'])
      .keys(['\uE004'])
      .keys(['\uE006'])
      .pause(3000)
      .assert.elementNotPresent('td>button')
      .end();
  }
};
