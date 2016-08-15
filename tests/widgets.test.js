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

      // NOTE: we need to make sure that env var
      // BYPASS_ADDING_SIP_URI is equal to 'false'
      // otherwise the bahaviour here would be different

      // this should take us to the "Add new sip uri" screen
      .pause(1000)
      .assert.containsText('body', 'Add a new SIP Address')
      .click('button.skip-sip')

      // now we should be in "create new Button" screen
      .pause(1000)
      .assert.containsText('body', 'Create a WebRTC Click-to-Call Button')

      // let's fill all the inputs to see if it works
      .setValue('input[name="configuration_name"]', 'My_Test_Button')
      .setValue('input[name="button_label"]', 'Call_this_Test!')
      .setValue('select[name="sip_uri"]', demoSipUri)
      .click('button.btn-style-b')

      // let's set some advanced configurations
      .click('a[href="#collapseAdvancedCallConfiguration"]')
      .setValue('input[name="caller_id"]', 'This_is_the_test_bot')
      .setValue('input[name="send_digits"]', '123')

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
      .pause(4000)

      // now check values in widget code
      .assert.containsText('#widget_code pre', escape('Call_this_Test!'))
      .assert.containsText('#widget_code pre', 'This_is_the_test_bot')
      .assert.containsText('#widget_code pre', '123')
      .assert.containsText('#widget_code pre', 'style-b')
      .assert.containsText('#widget_code pre', 'show_text_html')

      // time to fill the form and save the button
      .end();

      // TODO: delete the demo button created with this test
  }
};