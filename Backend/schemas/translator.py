from pydantic import BaseModel


class TranslationRequest(BaseModel):
    logical_address: int
    page_size: int


class TranslationResponse(BaseModel):
    page_number: int
    offset: int
    frame_number: int
    physical_address: int