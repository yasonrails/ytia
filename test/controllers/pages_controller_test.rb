require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_url
    assert_response :success
  end

  test "should submit contact form" do
    post contact_url, params: {
      contact: {
        name: "Jean Dupont",
        email: "jean.dupont@example.org",
        project_type: "Automatisation de workflows",
        message: "Nous voulons automatiser des validations documentaires avec un agent IA.",
        website: ""
      }
    }

    assert_redirected_to root_path(anchor: "contact")
    follow_redirect!
    assert_response :success
  end

  test "should reject invalid contact form" do
    post contact_url, params: {
      contact: {
        name: "",
        email: "bad-email",
        project_type: "",
        message: "trop court",
        website: ""
      }
    }

    assert_response :unprocessable_entity
  end
end
