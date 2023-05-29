import boto3
import botocore
import os
import uuid

BUCKET_NAME=os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png","jpg","jpeg","gif"}

s3 = boto3.client(
    "s3",
    region_name="us-west-1",
    aws_access_key_id = os.environ.get("S3_KEY"),
    aws_secret_access_key = os.environ.get("S3_SECRET"),
)

def get_uniquefilename(filename):

    ext = filename.split(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex

    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, filename, acl="public-read"):
    print("FILE ~~~")
    print(file.filename)
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )


    except Exception as e:
        return {"errors":str(e)}

    return{'url':f"{S3_LOCATION}{filename}"}

def delete_image(image_url):
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("S3_KEY"),
        aws_secret_access_key=os.environ.get("S3_SECRET"),
    )

    bucket_name = os.environ.get("S3_BUCKET")
    image_key = image_url.replace(f"https://{bucket_name}.s3.amazonaws.com/", "")

    try:
        s3.delete_object(Bucket=bucket_name, Key=image_key)
    except Exception as e:
        return {"errors": str(e)}

    return {"message": "Image deleted successfully"}
