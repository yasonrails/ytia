# Be sure to restart your server when you modify this file.

Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.font_src    :self, "https://fonts.gstatic.com", "https://fonts.googleapis.com"
    policy.img_src     :self, :data, "https://images.unsplash.com"
    policy.object_src  :none
    policy.script_src  :self  # nonce auto ajouté par Rails pour importmap
    policy.style_src   :self, :unsafe_inline, "https://fonts.googleapis.com"
    policy.connect_src :self
    policy.frame_ancestors :none
  end

  # Nonce automatique pour le script inline généré par javascript_importmap_tags
  config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
  config.content_security_policy_nonce_directives = %w(script-src)
end
