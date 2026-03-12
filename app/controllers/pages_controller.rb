class PagesController < ApplicationController
  def home
    @contact_form = default_contact_form
    @contact_errors = []
  end

  def contact
    @contact_form = default_contact_form.merge(contact_params.to_h.symbolize_keys)

    if spam_submission?
      flash[:notice] = "Merci. Votre demande a bien été reçue."
      redirect_to root_path(anchor: "contact")
      return
    end

    @contact_errors = validate_contact_form(@contact_form)
    if @contact_errors.any?
      flash.now[:alert] = "Le formulaire contient des informations manquantes ou invalides."
      render :home, status: :unprocessable_entity
      return
    end

    Rails.logger.info(
      "[contact] name=#{@contact_form[:name].inspect} email=#{@contact_form[:email].inspect} " \
      "project_type=#{@contact_form[:project_type].inspect} message=#{@contact_form[:message].to_s.tr("\n", " ").slice(0, 240).inspect}"
    )

    flash[:notice] = "Merci. Votre demande a bien été envoyée, nous revenons vers vous sous 24h ouvrées."
    redirect_to root_path(anchor: "contact")
  end

  def mentions_legales; end
  def confidentialite; end

  def sitemap
    @pages = [
      { loc: root_url, changefreq: "weekly",  priority: "1.0", lastmod: Date.today },
      { loc: mentions_legales_url, changefreq: "yearly", priority: "0.3", lastmod: Date.today },
      { loc: confidentialite_url,  changefreq: "yearly", priority: "0.3", lastmod: Date.today }
    ]
    render layout: false
  end

  private

  def contact_params
    params.fetch(:contact, {}).permit(:name, :email, :project_type, :message, :website, :rgpd_consent)
  end

  def default_contact_form
    {
      name: "",
      email: "",
      project_type: "",
      message: "",
      website: "",
      rgpd_consent: "0"
    }
  end

  def spam_submission?
    @contact_form[:website].present?
  end

  def validate_contact_form(form)
    errors = []
    errors << "Le nom est requis." if form[:name].blank?
    errors << "Un email professionnel valide est requis." unless valid_email?(form[:email])
    errors << "Veuillez sélectionner un type de projet." if form[:project_type].blank?

    message = form[:message].to_s.strip
    errors << "Le besoin doit contenir au moins 20 caractères." if message.length < 20
    errors << "Vous devez accepter la politique de confidentialité pour envoyer le formulaire." unless form[:rgpd_consent] == "1"
    errors
  end

  def valid_email?(value)
    value.to_s.match?(/\A[^@\s]+@[^@\s]+\.[^@\s]+\z/)
  end
end
