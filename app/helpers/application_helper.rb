module ApplicationHelper
  def seo_title
    content_for(:title).presence || "YTIA | IA fiable en production"
  end

  def seo_description
    content_for(:description).presence || "YTIA conçoit des systèmes IA fiables en production pour environnements critiques — agents LLM, RAG, cloud souverain, conformité RGPD et ISO 27001."
  end

  def seo_og_image
    content_for(:og_image).presence || "/icon.png"
  end

  def canonical_url
    request.original_url.split("?").first
  end
end
